import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { IDataProvider, Underflag, JSONData, Feature } from 'underflag'

type UnderflagState = {
  underflag: Underflag
}

const UnderflagContext = createContext<UnderflagState | undefined>(undefined)

type Props = {
  /** Underflag data provider to client-side */
  dataProvider: IDataProvider | JSONData
  children: ReactNode
}

const UnderflagProvider = ({ dataProvider, children }: Props) => {
  const underflag = new Underflag({
    dataProvider
  })

  return (
    <UnderflagContext.Provider value={{ underflag }}>
      {children}
    </UnderflagContext.Provider>
  )
}

const useUnderflag = () => {
  const context = useContext(UnderflagContext)

  if (context === undefined) {
    throw new Error('useUnderflag must be used within a UnderflagContext')
  }

  return context
}

type Keys = Array<string>

const useFeature = (keys: Keys): Array<Feature> => {
  const { underflag } = useUnderflag()
  const [currentFlags, setCurrentFlags] = useState<Array<Feature>>([])

  useEffect(() => {
    getFeatures(underflag, keys).then((res) => {
      setCurrentFlags(res as Array<Feature>)
    })
  }, [])

  return currentFlags
}

async function getFeatures(underflag: Underflag, keys: Keys) {
  return await underflag
    .getFeatures(keys)
    .then((res) => res.map((feature) => feature || undefined))
}

export { UnderflagProvider, useUnderflag, useFeature, UnderflagContext }
