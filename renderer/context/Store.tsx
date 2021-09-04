import { useReducer, createContext, Dispatch, Reducer } from 'react'

type Language = { name: string, key: 'en'|'fr' }

export const availableLanguages: Array<Language> = [
  { key: 'en', name: 'English' }, { key: 'fr', name: 'Français' },
]

type Action = {
  type: 'TOGGLE_THEME'
} | {
  type: 'UPDATE_COMPONENT'
  componentName?: string
} | {
  type: 'TOGGLE_RAWDATA'
} | {
  type: 'UPDATE_LANGUAGE',
  language: Language;
}

interface GlobalState {
  currentTheme: 'dark' | 'light',
  componentName?: string,
  rawData: boolean,
  language: Language
}

interface AppContextType extends GlobalState {
  dispatch: Dispatch<Action>
}

interface Props {
  children: JSX.Element
}

const initialStates: GlobalState = {
  currentTheme: 'light',
  componentName: undefined,
  rawData: false,
  language: availableLanguages[0],
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
      case 'TOGGLE_RAWDATA': {
        return {
          ...state,
          rawData: !state.rawData,
        }
      }
      case 'UPDATE_LANGUAGE': {
        return {
          ...state,
          language: action.language,
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
