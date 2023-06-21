# Classifications

The software system includes a builtin system for handling classifications,
which also support internationalization. Classifications are seeded into the
system on startup. See examples in the code for how this is performed.

## Properties

Each classification has the following properties:

- **label** what should be displayed in the UI.
- **locale** which is the locale for the classifications. It is specified in
  accordance with [RFC 5646](https://datatracker.ietf.org/doc/html/rfc5646), as
  for example `en-US`.
- **manual**. Classification should not be shown by default but can be
  explicitly requested.
- **obsolete**. If the classification has been deprecated.
- **uuid** unique value that is consistent across data base migrations.

## Parents

Classifications can have parents in order to achieve nested forms.

## Deprecation of classifications

Classifications should never be removed from the system, only deprecated. This
is to maintain potential existing relationships and avoid that the old UUID
being reused.
