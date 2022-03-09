import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {PrintJob} from './PrintJob';

@ObjectType()
export class PrintJobEdge extends EdgeType("printJob", PrintJob) {}

@ObjectType()
export class PrintJobConnection extends ConnectionType<PrintJobEdge>(
    "printJob",
    PrintJobEdge,
    PrintJob
) {}