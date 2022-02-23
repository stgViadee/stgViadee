import {fromGlobalId, toGlobalId} from 'graphql-relay';
import {decode, encode} from 'slugid';

export function convertIdsToGlobalId(typeName: string, resultSet: any[]) {
    return resultSet.map(item => {
        return {...item, id: toGlobalId(typeName, encode(item.id))};
    });
}

export function convertIdToGlobalId(typeName: string, item: any) {
    return {...item, id: toGlobalId(typeName, encode(item.id))};
}

export function convertFromGlobalId(globalId: string) {
    const {type, id} = fromGlobalId(globalId);
    return {
        type:type,
        id: decode(id),
    }
}
