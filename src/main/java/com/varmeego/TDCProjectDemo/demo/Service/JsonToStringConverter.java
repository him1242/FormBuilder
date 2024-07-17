package com.varmeego.TDCProjectDemo.demo.Service;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;



@Converter(autoApply = true)
public class JsonToStringConverter implements AttributeConverter<String, String> {

    @Override
    public String convertToDatabaseColumn(String attribute) {
        return attribute;
    }

    @Override
    public String convertToEntityAttribute(String dbData) {
        return dbData;
    }
}