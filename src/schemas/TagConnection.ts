import {ObjectType} from 'type-graphql';
import {EdgeType} from './relay/EdgeType';
import {ConnectionType} from './relay/ConnectionType';
import {Tag} from './Tag';

@ObjectType()
export class TagEdge extends EdgeType("tag", Tag) {}

@ObjectType()
export class TagConnection extends ConnectionType<TagEdge>(
    "tag",
    TagEdge,
    Tag
) {}