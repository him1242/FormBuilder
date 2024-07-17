package com.varmeego.TDCProjectDemo.demo.Service;

import com.varmeego.TDCProjectDemo.demo.DataModel.JSONForm;
import com.varmeego.TDCProjectDemo.demo.DataModel.UserForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDataService {


    @Autowired
    private UserDataRepository userDataRepository;
    public List<UserForm> findByName(String name) {
        return userDataRepository.findByName(name);
    }

    public UserForm saveJsonData(String jsonData) {
        UserForm data = new UserForm();
        data.setData(jsonData);
        return userDataRepository.save(data);
    }

    public List<String> getNamesByFormType(String formType) {
        return userDataRepository.findNamesByFormType(formType);
    }

}
