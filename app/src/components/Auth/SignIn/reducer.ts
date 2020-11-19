import { Action, Property } from '../../../util/'
import { validateEmail, validatePassword } from '../../../util'

interface State {
  email: Property,
  password: Property,
  message: {
    value: string,
    type: string,
  }
  isLoading: boolean
}

export const initialState: State = {
  email: {
    value: '',
    isValid: false,
    isTouched: false,
  },
  password: {
    value: '',
    isValid: false,
    isTouched: false,
  },
  message: {
    value: '',
    type: ''
  },
  isLoading: false,
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'emailUpdate':
      return {
        ...state,
        email: {
          value: action.payload,
          isValid: validateEmail(action.payload),
          isTouched: (state.email.value + action.payload).length > 0
        }
      }
    case 'passwordUpdate':
      return {
        ...state,
        password: {
          value: action.payload,
          isValid: validatePassword(action.payload),
          isTouched: (state.password.value + action.payload).length > 0
        }
      }
    case 'isLoading':
      return {
        ...state,
        isLoading: true,
      }
    case 'success':
      return {
        ...state,
        isLoading: false,
      }
    case 'error':
      return {
        ...state,
        isLoading: false,
        message: {
          value: action.payload,
          type: 'error'
        }
      }
  }
}