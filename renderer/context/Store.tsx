import { useReducer, createContext, Dispatch, Reducer } from 'react'

type Action = {
  type: 'TOGGLE_THEME'
} | {
  type: 'UPDATE_COMPONENT'
  componentName?: string
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
  currentTheme: 'light', componentName: undefined,
}

const GlobalContext = createContext<AppContextType>({
  ...initialStates,
  dispatch: () => initialStates,
});
const { Provider: ContextProvider } = GlobalContext;

function Store({ children }: Props) {
  const reducer: Reducer<GlobalState, Action> = (state: GlobalState, action: Action) => {
    switch (action.type) {
      case 'TOGGLE_THEME': {
        return {
          ...state,
          currentTheme: state.currentTheme === 'light' ? 'dark' : 'light',
        }
      }
      case 'UPDATE_COMPONENT': {
        return {
          ...state,
          componentName: action.componentName,
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
