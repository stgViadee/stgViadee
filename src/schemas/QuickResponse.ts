export class QuickResponse {
    types = {
        "09d7d496-4c13-4547-bb1d-f8715b6f202e": "asap",
        "59993cc1-60ad-4483-ba21-98c166b736fe": "busy",
        "25590087-3798-45a4-9e96-812e895fe5a6": "backIn5",
        "f6ee73b5-2d46-475b-9c87-f053af1ff130": "backIn10",
        "adc604f3-1ddd-4544-a026-ca4dd304c3f3": "backIn15",
    };

    get(identifier: string) {
        const self = this;

        const result = Object.keys(self.types).find(key => self.types[key] === identifier);

        return result;
    }
}

export const quickResponse = new QuickResponse();

function quickResponseFactory() {
    "ngInject";

    return quickResponse;
}
