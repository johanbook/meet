# Classifications

The software system includes a builtin system for handling classifications which
support for internationalization. Classifications are seeded into the system on
startup. See examples in the code for how this is performed.

## Properties

Each classification has the following properties:

- **label** what should be displayed in the UI.
- **locale** which is the locale for the classifications. It is specified in
  accordance with [RFC 5646](https://datatracker.ietf.org/doc/html/rfc5646), as
  for example `en-US`.
- **manual**. Classification should not be shown by default but can be
  explicitly requested.
- **obsolete** if the classification has been deprecated. See section later on.
- **parentUuid** is the UUID of the classification parent if nested.
- **uuid** unique value that is consistent across data base migrations.

## Seed file

All classifications are stored in seed files, for example a file named
`gender_en-US.csv` containing:

```csv
uuid,label,manual,obsolete,parentUuid
b66e1c9f-1381-472c-af75-2c2bc2166124,"Male",false,false,
1c7a1cef-f7ea-4022-85dc-81bcca0b79d7,"Female",false,false,
79e18bbf-8c29-4d2e-97e3-0ddb3188fa03,"Prefer not to say",false,false,
```

It is possible to control which environment the different sets of
classifications are seeded to.

## Parents

Classifications can have parents in order to achieve nested forms.

## Deprecation of classifications

Classifications should never be removed from the system, only deprecated. This
is to maintain potential existing relationships and avoid the old UUID from
being reused.
