import fs from "node:fs"
import path from "node:path"
import { volunteering, type VolunteeringMission } from "@/data/volunteering"

const PHOTO_EXT = /\.(jpe?g|png|webp)$/i

export interface MissionPhotos {
  cover?: string
  photos: string[]
}

/** Reads the mission's photo folder at build time. Returns no photos if the folder is missing or empty. */
export function getMissionPhotos(mission: VolunteeringMission): MissionPhotos {
  const dir = path.join(process.cwd(), "public", "images", "volunteering", mission.photoFolder)
  let files: string[] = []
  try {
    files = fs.readdirSync(dir).filter((f) => PHOTO_EXT.test(f)).sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
  } catch {
    return { photos: [] }
  }
  const toUrl = (f: string) => `/images/volunteering/${mission.photoFolder}/${f}`
  const coverFile = files.find((f) => /^cover\./i.test(f))
  const photos = files.filter((f) => f !== coverFile).map(toUrl)
  return { cover: coverFile ? toUrl(coverFile) : photos[0], photos }
}

export type MissionWithPhotos = VolunteeringMission & MissionPhotos

export function getMissionsWithPhotos(): MissionWithPhotos[] {
  return volunteering.map((m) => ({ ...m, ...getMissionPhotos(m) }))
}
