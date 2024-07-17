package com.varmeego.TDCProjectDemo.demo.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.varmeego.TDCProjectDemo.demo.DataModel.JSONForm;
import com.varmeego.TDCProjectDemo.demo.DataModel.UserForm;
import com.varmeego.TDCProjectDemo.demo.Service.JsonDataService;
import com.varmeego.TDCProjectDemo.demo.Service.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FormBuilderController {
    @Autowired
    private JsonDataService jsonDataService;

    @Autowired
    private UserDataService userDataService;

    @Autowired
    private ObjectMapper objectMapper;
    @PostMapping("/JSONForm")
    public ResponseEntity<JSONForm> createJsonData(@RequestBody String jsonData) throws JsonProcessingException {


        JSONForm savedData = jsonDataService.saveJsonData(jsonData);
        return new ResponseEntity<>(savedData, HttpStatus.CREATED);
    }

    @PostMapping("/deployJSONForm")
    public String deployJSONForm(@RequestParam String name, @RequestParam String formType) throws JsonProcessingException {

        jsonDataService.setCompanyInformationFormsNotDeployed(formType);

       jsonDataService.setCompanyInformationFormsDeployedByNameAndType(formType,name);
        return "Success" ;
    }

    @GetMapping("/findByName")
    public String findByName(@RequestParam String name) {

        return jsonDataService.findByName(name).get(0).getData();
    }

    @PostMapping("/submitUserForm")
    public ResponseEntity<UserForm> submitUserForm(@RequestBody String jsonData) throws JsonProcessingException {


        UserForm savedData = userDataService.saveJsonData(jsonData);
        return new ResponseEntity<>(savedData, HttpStatus.CREATED);
    }



}
