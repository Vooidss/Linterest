package com.linterest.backend.Converters;

public interface Convert<T,V> {
    public T convert(V obj);
}
