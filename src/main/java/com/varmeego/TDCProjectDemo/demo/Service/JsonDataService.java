package com.varmeego.TDCProjectDemo.demo.Service;

import com.varmeego.TDCProjectDemo.demo.DataModel.JSONForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JsonDataService {

    @Autowired
    private JsonDataRepository jsonDataRepository;

    public JSONForm saveJsonData(String jsonData) {
        JSONForm data = new JSONForm();
        data.setData(jsonData);
        return jsonDataRepository.save(data);
    }
    public List<String> getNamesByFormType(String formType) {
        return jsonDataRepository.findNamesByFormType(formType);
    }
    public List<JSONForm> findByName(String name) {
        return jsonDataRepository.findByName(name);
    }

    public void setCompanyInformationFormsNotDeployed(String formType)
    {

        jsonDataRepository.setCompanyInformationFormsNotDeployed(formType);

    }

    public List<JSONForm> findDeployedFormByFormType(String formType)
    {
       return  jsonDataRepository.findDeployedFormByFormType(formType);

    }


    public void setCompanyInformationFormsDeployedByNameAndType(String formType, String name)
    {
         jsonDataRepository.setCompanyInformationFormsDeployedByNameAndType(formType,name);

    }


}
