import { useState } from 'react'
import './App.css'

// Contents
import { UIProvider } from './context/UIContext';

// Layouts
import AppLayout from "./layouts/Layout/Layout"
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import {MessageProvider} from "./context/MessageContext";
import { SocketProvider } from './context/SocketContext';

function App() {

  return (
    <>
      {/* Context */}
        <UIProvider>
          <AuthProvider>
            <SocketProvider>
              <ChatProvider>
                <MessageProvider>
                  <AppLayout /> 
                </MessageProvider>
              </ChatProvider>
            </SocketProvider>
          </AuthProvider>
        </UIProvider>
    </>
  )
}

export default App
