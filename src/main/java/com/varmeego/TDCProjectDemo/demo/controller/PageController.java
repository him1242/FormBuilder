package com.varmeego.TDCProjectDemo.demo.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.*;
import com.varmeego.TDCProjectDemo.demo.DataModel.JSONForm;
import com.varmeego.TDCProjectDemo.demo.DataModel.UserForm;
import com.varmeego.TDCProjectDemo.demo.Service.JsonDataService;
import com.varmeego.TDCProjectDemo.demo.Service.UserDataService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

import java.util.Iterator;
import java.util.List;

@Controller
public class PageController {
    @Autowired
    private UserDataService userDataService;
    @Autowired
    private JsonDataService jsonDataService;
    @GetMapping("/companyInformationReviewer")
    public String companyInformationReviewer(Model model) {

        List<String> formList = jsonDataService.getNamesByFormType("CompanyInformation");

        model.addAttribute("formList", formList);

        List<JSONForm> deployed = jsonDataService.findDeployedFormByFormType("CompanyInformation");


        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // Parse JSON string into JsonNode
            if(deployed.size()>0) {

                JsonNode jsonNode = objectMapper.readTree(deployed.get(0).getData());
                String name = jsonNode.get("name").asText();

                // Print the value
                System.out.println("Name: " + name);
                model.addAttribute("productionFormName", name );
            }
            // Extract the value of the attribute "name"


        } catch (Exception e) {
            e.printStackTrace();
        }

        return "adminFormBuilderReviewer";
    }
    @GetMapping("/companyInformationAdmin")
    public String companyInformationAdmin(Model model) {

        List<String> formList = jsonDataService.getNamesByFormType("CompanyInformation");

        model.addAttribute("formList", formList);

        List<JSONForm> deployed = jsonDataService.findDeployedFormByFormType("CompanyInformation");


        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // Parse JSON string into JsonNode
            if(deployed.size()>0) {

                JsonNode jsonNode = objectMapper.readTree(deployed.get(0).getData());
                String name = jsonNode.get("name").asText();

                // Print the value
                System.out.println("Name: " + name);
                model.addAttribute("productionFormName", name );
            }
            // Extract the value of the attribute "name"


        } catch (Exception e) {
            e.printStackTrace();
        }

        return "adminFormBuilder";
    }


    @GetMapping("/companyInformation")
    public String companyInformation(Model model) {
        List<JSONForm> formList = jsonDataService.findDeployedFormByFormType("CompanyInformation");
        if (formList.size() > 0) {
            Gson gson = new Gson();
            JsonObject jsonObject = JsonParser.parseString(formList.get(0).getData()).getAsJsonObject();
            JsonArray jsonArray = jsonObject.getAsJsonArray("formData");

            Iterator<JsonElement> iterator = jsonArray.iterator();
            while (iterator.hasNext()) {
                JsonElement field = iterator.next();
                if (field.getAsJsonObject().has("role")) {
                    String role = field.getAsJsonObject().get("role").getAsString();
                    if (!role.equals("Exibitor")) {
                        iterator.remove();
                    }
                }
            }

            // Convert the modified JsonObject back to a JSON string
            String updatedJsonString = gson.toJson(jsonObject);

            // Update the JSONForm object with the new JSON string
            formList.get(0).setData(updatedJsonString);

            // Pass the updated JSON string to the model attribute
            model.addAttribute("formString", updatedJsonString);
            model.addAttribute("imageType", "Exibitor");


        }


        return "applicationForm";
    }

    @GetMapping("/companyInformationAgent")
    public String companyInformationAgent(Model model) {
        List<JSONForm> formList = jsonDataService.findDeployedFormByFormType("CompanyInformation");
        if (formList.size() > 0) {
            Gson gson = new Gson();
            JsonObject jsonObject = JsonParser.parseString(formList.get(0).getData()).getAsJsonObject();
            JsonArray jsonArray = jsonObject.getAsJsonArray("formData");

            Iterator<JsonElement> iterator = jsonArray.iterator();
            while (iterator.hasNext()) {
                JsonElement field = iterator.next();
                if (field.getAsJsonObject().has("role")) {
                    String role = field.getAsJsonObject().get("role").getAsString();
                    if (!role.equals("Agent")) {
                        iterator.remove();
                    }
                }
            }

            // Convert the modified JsonObject back to a JSON string
            String updatedJsonString = gson.toJson(jsonObject);

            // Update the JSONForm object with the new JSON string
            formList.get(0).setData(updatedJsonString);

            // Pass the updated JSON string to the model attribute
            model.addAttribute("formString", updatedJsonString);
            model.addAttribute("imageType", "Agent");

        }


        return "applicationForm";
    }


    @GetMapping("/viewUserForm")
    public String viewUserForm(Model model, @RequestParam String formName) {

        List<UserForm> formList =userDataService.findByName(formName);
        if(formList.size()>0) {
            model.addAttribute("formString", formList.get(0).getData());
        }


        model.addAttribute("imageType", "TDCStaff");

        return "applicationForm";
    }

    @GetMapping("/getAllUserForms")
    public String getAllUserForms(Model model) {

        List<String> formNames =userDataService.getNamesByFormType("CompanyInformation");

        model.addAttribute("formNames", formNames);

        return "userForms";
    }

    @PostMapping("/previewForm")
    public String previewForm(Model model, @RequestBody String jsonData) {

        model.addAttribute("formString", jsonData);

        return "previewForm";
    }

}
