import { gql } from "@apollo/client";

export default gql`
  mutation updateProcessExecution($input: UpdateProcessExecutionInput) {
    updateProcessExecution(input: $input) {
      id
    }
  }
`
