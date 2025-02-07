package com.linterest.backend.v2.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.linterest.backend.v2.Models.Image;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "tagsForImage")
public class TagsForImage {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToMany(mappedBy = "tags")
    @JsonBackReference
    private List<Image> images = new ArrayList<>();
}
