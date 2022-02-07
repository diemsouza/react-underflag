import React, { createContext, ReactNode, useContext } from 'react'
import { IDataProvider, Underflag, JsonDataProvider, JSONData } from 'underflag'

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

export { UnderflagProvider, useUnderflag, UnderflagContext, JsonDataProvider }
