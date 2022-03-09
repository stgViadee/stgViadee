import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {Document} from './Document';

@ObjectType()
export class DocumentEdge extends EdgeType("document", Document) {}

@ObjectType()
export class DocumentConnection extends ConnectionType<DocumentEdge>(
    "document",
    DocumentEdge,
    Document
) {}