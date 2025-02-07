package com.linterest.backend.v2.Repositories;

import com.linterest.backend.v2.Models.TagsForImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<TagsForImage, Long> {
    @Query("SELECT t FROM TagsForImage t WHERE t.name LIKE CONCAT(:word, '%')")
    List<TagsForImage> findTagByLetters(@Param("word") String word);

    @Query("SELECT COUNT(t) FROM TagsForImage t WHERE t.name LIKE CONCAT(:word, '%')")
    Integer countTagsByLetters(@Param("word") String word);

    @Query("SELECT t FROM TagsForImage t WHERE t.id = :id")
    TagsForImage findTagById(@Param("id") Integer id);
}
