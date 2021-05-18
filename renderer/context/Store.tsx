import { useReducer, createContext, Dispatch } from 'react'

type Action = {
  type: 'UPDATE_THEME'
  payload: 'dark' | 'light'
} | {
  type: 'UPDATE_COMPONENT'
  payload?: string
}

interface GlobalState {
  currentTheme: 'dark' | 'light',
  componentName?: string
}

interface AppContextType extends GlobalState {
  dispatch: Dispatch<Action>
}

interface Props {
  children: JSX.Element
}

const initialStates: GlobalState = {
  currentTheme: 'dark', componentName: undefined,
}

const GlobalContext = createContext<AppContextType>({
  ...initialStates,
  dispatch: () => initialStates,
});
const { Provider: ContextProvider } = GlobalContext;

function Store({ children }: Props) {
  const reducer = (state: GlobalState, action: Action) => {
    switch (action.type) {
      case 'UPDATE_THEME': {
        return {
          ...state,
          currentTheme: action.payload,
        }
      }
      case 'UPDATE_COMPONENT': {
        return {
          ...state,
          componentName: action.payload,
        }
      }
      default: {
        return state
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialStates);

  return (
    <ContextProvider value={ { ...state, dispatch } }>
      {children}
    </ContextProvider>
  )
}

export { GlobalContext };
export default Store;
