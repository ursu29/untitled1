import gql from 'graphql-tag'

export default gql`
  mutation updateProcessExecution($input: UpdateProcessExecutionInput) {
    updateProcessExecution(input: $input) {
      id
    }
  }
`
