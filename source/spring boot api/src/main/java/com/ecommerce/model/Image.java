package com.ecommerce.model;

public class Image {
    private String src;
    private String alt;

    // Constructors, getters, and setters
    public Image() {
    }

    public Image(String src, String alt) {
        this.src = src;
        this.alt = alt;
    }

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    public String getAlt() {
        return alt;
    }

    public void setAlt(String alt) {
        this.alt = alt;
    }
}
