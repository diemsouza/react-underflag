import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import {
  IDataProvider,
  Underflag,
  JSONData,
  isOn,
  Feature as BaseFeature
} from 'underflag'

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

type Features = Array<string>

interface Feature extends BaseFeature {
  isOn: () => boolean
}

const useFeature = (features: Features): Array<Feature> => {
  const { underflag } = useUnderflag()
  const [currentFlags, setCurrentFlags] = useState<Array<Feature>>([])

  useEffect(() => {
    getFlags(underflag, features).then((res) => {
      setCurrentFlags(res as Array<Feature>)
    })
  }, [])

  return currentFlags
}

async function getFlags(underflag: Underflag, features: Features) {
  return await underflag.getFeatures(features).then((res) =>
    res.map((feature) =>
      feature
        ? {
          ...feature,
          isOn: () => isOn(feature)
        }
        : undefined
    )
  )
}

export { UnderflagProvider, useUnderflag, useFeature, UnderflagContext }
