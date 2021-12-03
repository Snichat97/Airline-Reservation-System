package com.sjsu.sprintersairline.util;

import org.bson.types.ObjectId;

public class ObjectIdUtil {

    public static ObjectId convertToObjectId(String id) {
        if (id instanceof String && ObjectId.isValid(id)) {
            return new ObjectId(id);
        }
        return null;
    }
}
