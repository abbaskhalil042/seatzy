# Flight Query Learnings

This note explains what went wrong in the flight query code, how it was fixed, and what concepts you should remember for future Sequelize work.

## 1. Main Problem

Two things were failing:

1. Airport data was not coming inside:

```ts
include: [
  {
    model: Airport,
    as: "departureAirport",
  },
  {
    model: Airport,
    as: "arrivalAirport",
  },
];
```

2. Filters like `trips`, `price`, `totalSeats`, and `tripDate` were not behaving reliably.

These were not random bugs. They came from a mismatch between:

- database foreign key design
- Sequelize association configuration
- request query parsing

## 2. Biggest Learning: Database Design Must Match Association Design

In the `flights` table:

- `departureAirportId` stores an airport code like `BLR`
- `arrivalAirportId` stores an airport code like `DEL`

That means these fields are not actually storing `Airport.id`.

They are storing `Airport.code`.

This is the key idea:

- if your foreign key points to the target model's primary key, Sequelize can often infer the join
- if your foreign key points to some other unique column, you must tell Sequelize explicitly

## 3. Why The Include Was Not Returning Airport Data

By default, `belongsTo(Airport)` expects the join to happen like this:

```text
flight.departureAirportId -> Airport.id
```

But your schema was actually:

```text
flight.departureAirportId -> Airport.code
flight.arrivalAirportId -> Airport.code
```

So Sequelize was trying to join code values like `BLR` against integer `id` values.

That join cannot match, so included airport data comes back empty or null.

## 4. Correct Fix For Non-Primary-Key Joins

When the foreign key points to a non-primary unique column, use:

- `targetKey` in `belongsTo`
- `sourceKey` in `hasMany`

Example:

```ts
this.belongsTo(models.Airport, {
  foreignKey: "departureAirportId",
  as: "departureAirport",
  targetKey: "code",
});
```

and:

```ts
this.hasMany(models.Flight, {
  foreignKey: "departureAirportId",
  as: "departingFlights",
  sourceKey: "code",
});
```

### What To Remember

- `foreignKey`: column on the current model that stores the relationship
- `targetKey`: column on the target model that the foreign key points to
- `sourceKey`: column on the source model used by the reverse association

## 5. `include` Uses Associations, Not Random Query Options

Once associations are defined properly, this is enough:

```ts
include: [
  { model: Airport, as: "departureAirport" },
  { model: Airport, as: "arrivalAirport" },
];
```

You do not need to keep restating `foreignKey` in the `include`.

Important learning:

- `include` should match the alias used in the association
- if the alias in `include.as` does not match the alias in `belongsTo` or `hasMany`, Sequelize will fail

## 6. Aliases Must Stay Consistent Everywhere

These three places must agree:

1. model association
2. include query
3. the property name you expect in the response

Example:

```ts
as: "departureAirport"
```

If your association says `departureAirport` but your `include` uses something else, Sequelize will not know which relation to load.

## 7. Filter Bugs Often Come From Query Parsing, Not Sequelize

A lot of filtering bugs happen before Sequelize even runs the SQL.

Example:

```ts
if (query.trips) {
  const [departureAirportId, arrivalAirportId] = query.trips.split("-");
}
```

This assumes:

- `query.trips` exists
- it is a string
- it contains exactly one `-`
- both values are present

If any of these assumptions fail, your filter object becomes wrong.

### What Changed

The service now:

- normalizes query values
- handles array-vs-string cases
- validates format
- converts numeric strings into numbers before filtering

### Lesson

Always validate query params before building the `where` clause.

## 8. Validate Query Format Early

For `trips`, the expected format is:

```text
BLR-DEL
```

So the service should reject invalid inputs like:

- `BLR`
- `BLR-`
- `-DEL`
- `BLR-DEL-MAA`

Good backend code should fail loudly on malformed input instead of silently returning confusing data.

## 9. Type Conversion Matters

Express query params usually arrive as strings.

That means:

- `totalSeats` comes as `"2"`
- `price` comes as `"3000-6000"`
- `tripDate` comes as `"2026-04-10"`

If you do not convert them, you may compare strings instead of numbers.

### Example

```ts
Number(query.totalSeats)
```

This is necessary before using numeric operators like:

```ts
[Op.gte]
```

## 10. Schema Type Mismatch Creates Query Problems

In your flight model and migration, `price` is stored as a string:

```ts
price: {
  type: DataTypes.STRING,
}
```

That is not ideal for numeric filtering.

Why this is a problem:

- string sorting is different from numeric sorting
- string comparison is different from numeric comparison
- range filtering becomes harder

Example of wrong string behavior:

```text
"10000" < "900"
```

as strings, because comparison is lexical, not numeric.

### Temporary Fix

The query now casts `price` before filtering.

### Better Long-Term Fix

Store `price` as:

- `INTEGER`, or
- `DECIMAL`

### Lesson

If a field is numeric in real life, store it as a numeric type in the database.

## 11. Filtering Logic Should Match Real Data Types

Your current setup mixes:

- airport code values in fields named `departureAirportId`
- numeric values stored as strings

This still works after patching, but naming and schema consistency matter.

### Better Naming

Instead of:

- `departureAirportId`
- `arrivalAirportId`

you could use:

- `departureAirportCode`
- `arrivalAirportCode`

That would make the data model easier to understand.

### Lesson

Good naming prevents future bugs.

## 12. Repository Code Should Be Thin

Your repository method:

```ts
async getAllFlights(filter: any, sort: any) {
  return flight.findAll({
    where: filter,
    order: sort,
    include: [...],
  });
}
```

This is a good place for query execution.

But the repository should not contain too much business parsing logic.

The service layer should:

- parse request input
- validate format
- build filter objects
- decide sorting

The repository should:

- run Sequelize queries

### Lesson

Keep parsing and validation in services, not in repositories.

## 13. Small Controller Bugs Can Hide In Nearby Code

In the delete controller, the wrong service was being called:

```ts
deleteAirport(req.params.id)
```

instead of:

```ts
deleteFlight(req.params.id)
```

This was unrelated to include/filter bugs, but it was in the same flow.

### Lesson

When debugging one area, scan surrounding code for obvious mistakes too.

## 14. TypeScript Interfaces Should Match Actual Data

The previous interface said:

```ts
departureAirportId: number;
arrivalAirportId: number;
```

But actual values are airport codes like `BLR`, so they are strings.

That mismatch makes the code harder to reason about.

### Lesson

Type definitions are part of your documentation.

If TypeScript types do not match reality, bugs become easier to write.

## 15. Practical Debugging Workflow To Remember

When `include` or filter logic fails, debug in this order:

1. Check what values are actually stored in the database.
2. Check the migration type.
3. Check the model type.
4. Check the association definition.
5. Check whether aliases match.
6. Check how query params are parsed.
7. Check the final `where` object being sent to Sequelize.
8. Check whether the data type supports that filter correctly.

This order saves time because it starts from the real data, not assumptions.

## 16. Checklist For Future Sequelize Work

Before writing an `include`, verify:

- what column is the foreign key
- what exact value is stored in that column
- whether it points to `id` or another unique field
- whether the alias is defined
- whether the reverse relation also needs `sourceKey`

Before writing filters, verify:

- request params are strings or arrays
- invalid formats are rejected
- numeric values are converted
- date boundaries are explicit
- sorting fields exist and use valid directions

## 17. Best Practices You Should Note Down

Write these as short rules for yourself:

1. Always check the actual database column value before fixing an association.
2. If a foreign key points to a non-primary column, use `targetKey` or `sourceKey`.
3. Keep association aliases identical across model and query code.
4. Validate request query format before building filters.
5. Convert strings to numbers before numeric filtering.
6. Store numbers as numeric database types, not strings.
7. Keep services responsible for parsing and repositories responsible for querying.
8. Make TypeScript interfaces match the actual stored data.
9. Fix nearby obvious bugs while already in the same code path.
10. When debugging Sequelize, inspect schema, model, association, and query in that order.

## 18. What You Should Improve Next

If you want this codebase to become cleaner, the next good steps are:

1. Rename `departureAirportId` and `arrivalAirportId` to code-based names if they truly store airport codes.
2. Change `price` from `STRING` to `INTEGER` or `DECIMAL`.
3. Add stronger validation for query params and request bodies.
4. Add integration tests for:
   - include loading
   - trips filter
   - price range filter
   - seats filter
   - trip date filter
   - sorting

## 19. Final Summary

The real root cause was not the `include` statement itself.

The real cause was that the relationship was configured as if flight rows referenced `Airport.id`, while the database actually stored `Airport.code`.

The filter issues came from weak query parsing and a schema/type mismatch, especially because `price` was stored as a string.

If you remember only one thing, remember this:

Sequelize works well only when your database schema, model types, association config, and request parsing all agree with each other.
