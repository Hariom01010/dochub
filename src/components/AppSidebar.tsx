import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from './ui/sidebar'

export default function AppSidebar() {
  return (
        <Sidebar>
            <SidebarHeader>Header</SidebarHeader>
            <SidebarContent>Body`</SidebarContent>
            <SidebarFooter>Footer</SidebarFooter>
        </Sidebar>
  )
}
