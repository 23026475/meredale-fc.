import { type SchemaTypeDefinition } from 'sanity'
import player from './player'
import staff from './staff'
import fixture from './fixture'
import news from './news'
import gallery from './gallery'
import sponsor from './sponsor'

export const schemaTypes: SchemaTypeDefinition[] = [
  player, 
  staff, 
  fixture, 
  news, 
  gallery, 
  sponsor
]