package com.linterest.backend.v2.Converters;

public interface Convert<T,V> {
    public T convert(V obj);
}
