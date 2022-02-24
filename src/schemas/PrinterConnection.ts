import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {Printer} from './Printer';

@ObjectType()
export class PrinterEdge extends EdgeType("printer", Printer) {}

@ObjectType()
export class PrinterConnection extends ConnectionType<PrinterEdge>(
    "printer",
    PrinterEdge
) {}