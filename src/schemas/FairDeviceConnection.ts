import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {FairDevice} from './FairDevice';

@ObjectType()
export class FairDeviceEdge extends EdgeType("fairDevice", FairDevice) {}

@ObjectType()
export class FairDeviceConnection extends ConnectionType<FairDeviceEdge>(
    "fairDevice",
    FairDeviceEdge,
    FairDevice
) {}