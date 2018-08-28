export const validate = (values) => { // TODO tests!
  const errors = {}

  // path
  if (!values.path) {
    errors.path = 'Required'
  }

  // safe
  if (typeof values.safe !== 'boolean') {
    errors.safe = 'Must be true or false'
  }

  return errors
}
