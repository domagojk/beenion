import { Event } from '../../../model/eventTypes'
import { dynamoDbEventStore } from './dynamoDbEventStore'

export type EventStore = typeof dynamoDbEventStore
