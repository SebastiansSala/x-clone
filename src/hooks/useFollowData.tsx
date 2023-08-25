"use client"

import { useContext } from "react"

import { FollowDataContext } from "@/contexts/follow-data-context"

export default function useFollowData() {
  return useContext(FollowDataContext)
}
