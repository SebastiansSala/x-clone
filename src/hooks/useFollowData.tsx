"use client"

import { useContext } from "react"

import { FollowDataContext } from "@/contexts/follow-data-context"

export default function useFollowData() {
  const context = useContext(FollowDataContext)
  if (!context) {
    throw new Error("useFollowData must be used within a FollowDataProvider")
  }

  return context
}
