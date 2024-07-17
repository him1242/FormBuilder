package com.varmeego.TDCProjectDemo.demo.Service;

import com.varmeego.TDCProjectDemo.demo.DataModel.JSONForm;
import com.varmeego.TDCProjectDemo.demo.DataModel.UserForm;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDataRepository extends JpaRepository<UserForm, Long> {
    @Query(value = "SELECT * FROM user_form WHERE data->>'name' = :name", nativeQuery = true)
    List<UserForm> findByName(@Param("name") String name);

    @Query(value = "SELECT data->>'name' FROM user_form WHERE data->> 'formType' = :formType", nativeQuery = true)
    List<String> findNamesByFormType(@Param("formType") String formType);

}