import { Action, Property } from '../../../util/'
import { validateEmail, validatePassword } from '../../../util'

interface Viewable extends Property {
  hidePassword: boolean
}

interface State {
  email: Property,
  password: Viewable,
  confirmPassword: Viewable
  message: {
    value: string,
    type: string
  },
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
    hidePassword: true,
  },
  confirmPassword: {
    value: '',
    isValid: false,
    isTouched: false,
    hidePassword: true,
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
          ...state.password,
          value: action.payload,
          isValid: validatePassword(action.payload),
          isTouched: (state.password.value + action.payload).length > 0
        }
      }
    case 'confirmPasswordUpdate':
      return {
        ...state,
        confirmPassword: {
          ...state.confirmPassword,
          value: action.payload,
          isValid: action.payload === state.password.value,
          isTouched: (state.confirmPassword.value + action.payload).length > 0
        },
      }
    case 'togglePassword':
      return {
        ...state,
        password: {
          ...state.password,
          hidePassword: !state.password.hidePassword,
        }
      }
    case 'toggleConfirmPassword':
      return {
        ...state,
        confirmPassword: {
          ...state.confirmPassword,
          hidePassword: !state.confirmPassword.hidePassword,
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