package at.htl.model;

import java.time.LocalDate;

public class SurveyDTO {
    public LocalDate creationDate;
    public LocalDate endDate;
    public Long templateId;
    public Status status;
    public String name;
    public String description;
}
