//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.2-147 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2016.03.31 at 09:48:19 PM CST 
//


package mx.gob.sat.esquemas.contabilidade._1_1.catalogocuentas;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.*;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="Ctas" maxOccurs="unbounded">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;attribute name="CodAgrup" use="required" type="{www.sat.gob.mx/esquemas/ContabilidadE/1_1/CatalogosParaEsqContE}c_CodAgrup" />
 *                 &lt;attribute name="NumCta" use="required">
 *                   &lt;simpleType>
 *                     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                       &lt;maxLength value="100"/>
 *                       &lt;minLength value="1"/>
 *                     &lt;/restriction>
 *                   &lt;/simpleType>
 *                 &lt;/attribute>
 *                 &lt;attribute name="Desc" use="required">
 *                   &lt;simpleType>
 *                     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                       &lt;minLength value="1"/>
 *                       &lt;maxLength value="400"/>
 *                     &lt;/restriction>
 *                   &lt;/simpleType>
 *                 &lt;/attribute>
 *                 &lt;attribute name="SubCtaDe">
 *                   &lt;simpleType>
 *                     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                       &lt;minLength value="1"/>
 *                       &lt;maxLength value="100"/>
 *                     &lt;/restriction>
 *                   &lt;/simpleType>
 *                 &lt;/attribute>
 *                 &lt;attribute name="Nivel" use="required">
 *                   &lt;simpleType>
 *                     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}int">
 *                       &lt;minInclusive value="1"/>
 *                     &lt;/restriction>
 *                   &lt;/simpleType>
 *                 &lt;/attribute>
 *                 &lt;attribute name="Natur" use="required">
 *                   &lt;simpleType>
 *                     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *                       &lt;pattern value="[DA]"/>
 *                     &lt;/restriction>
 *                   &lt;/simpleType>
 *                 &lt;/attribute>
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *       &lt;/sequence>
 *       &lt;attribute name="Version" use="required" type="{http://www.w3.org/2001/XMLSchema}string" fixed="1.1" />
 *       &lt;attribute name="RFC" use="required">
 *         &lt;simpleType>
 *           &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *             &lt;minLength value="12"/>
 *             &lt;maxLength value="13"/>
 *             &lt;pattern value="[A-ZÑ&amp;]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z0-9]?[A-Z0-9]?[0-9A-Z]?"/>
 *           &lt;/restriction>
 *         &lt;/simpleType>
 *       &lt;/attribute>
 *       &lt;attribute name="Mes" use="required">
 *         &lt;simpleType>
 *           &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *             &lt;enumeration value="01"/>
 *             &lt;enumeration value="02"/>
 *             &lt;enumeration value="03"/>
 *             &lt;enumeration value="04"/>
 *             &lt;enumeration value="05"/>
 *             &lt;enumeration value="06"/>
 *             &lt;enumeration value="07"/>
 *             &lt;enumeration value="08"/>
 *             &lt;enumeration value="09"/>
 *             &lt;enumeration value="10"/>
 *             &lt;enumeration value="11"/>
 *             &lt;enumeration value="12"/>
 *           &lt;/restriction>
 *         &lt;/simpleType>
 *       &lt;/attribute>
 *       &lt;attribute name="Anio" use="required">
 *         &lt;simpleType>
 *           &lt;restriction base="{http://www.w3.org/2001/XMLSchema}int">
 *             &lt;minInclusive value="2015"/>
 *             &lt;maxInclusive value="2099"/>
 *           &lt;/restriction>
 *         &lt;/simpleType>
 *       &lt;/attribute>
 *       &lt;attribute name="Sello">
 *         &lt;simpleType>
 *           &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *             &lt;whiteSpace value="collapse"/>
 *           &lt;/restriction>
 *         &lt;/simpleType>
 *       &lt;/attribute>
 *       &lt;attribute name="noCertificado">
 *         &lt;simpleType>
 *           &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *             &lt;length value="20"/>
 *           &lt;/restriction>
 *         &lt;/simpleType>
 *       &lt;/attribute>
 *       &lt;attribute name="Certificado">
 *         &lt;simpleType>
 *           &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *             &lt;whiteSpace value="collapse"/>
 *           &lt;/restriction>
 *         &lt;/simpleType>
 *       &lt;/attribute>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "ctas"
})
@XmlRootElement(name = "Catalogo")
public class Catalogo {

    @XmlElement(name = "Ctas", required = true)
    protected List<Catalogo.Ctas> ctas;
    @XmlAttribute(name = "Version", required = true)
    protected String version;
    @XmlAttribute(name = "RFC", required = true)
    protected String rfc;
    @XmlAttribute(name = "Mes", required = true)
    protected String mes;
    @XmlAttribute(name = "Anio", required = true)
    protected int anio;
    @XmlAttribute(name = "Sello")
    protected String sello;
    @XmlAttribute(name = "noCertificado")
    protected String noCertificado;
    @XmlAttribute(name = "Certificado")
    protected String certificado;

    /**
     * Gets the value of the ctas property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the ctas property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getCtas().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Catalogo.Ctas }
     * 
     * 
     */
    public List<Catalogo.Ctas> getCtas() {
        if (ctas == null) {
            ctas = new ArrayList<Catalogo.Ctas>();
        }
        return this.ctas;
    }

    /**
     * Gets the value of the version property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVersion() {
        if (version == null) {
            return "1.1";
        } else {
            return version;
        }
    }

    /**
     * Sets the value of the version property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVersion(String value) {
        this.version = value;
    }

    /**
     * Gets the value of the rfc property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRFC() {
        return rfc;
    }

    /**
     * Sets the value of the rfc property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRFC(String value) {
        this.rfc = value;
    }

    /**
     * Gets the value of the mes property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMes() {
        return mes;
    }

    /**
     * Sets the value of the mes property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMes(String value) {
        this.mes = value;
    }

    /**
     * Gets the value of the anio property.
     * 
     */
    public int getAnio() {
        return anio;
    }

    /**
     * Sets the value of the anio property.
     * 
     */
    public void setAnio(int value) {
        this.anio = value;
    }

    /**
     * Gets the value of the sello property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSello() {
        return sello;
    }

    /**
     * Sets the value of the sello property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSello(String value) {
        this.sello = value;
    }

    /**
     * Gets the value of the noCertificado property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNoCertificado() {
        return noCertificado;
    }

    /**
     * Sets the value of the noCertificado property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNoCertificado(String value) {
        this.noCertificado = value;
    }

    /**
     * Gets the value of the certificado property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCertificado() {
        return certificado;
    }

    /**
     * Sets the value of the certificado property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCertificado(String value) {
        this.certificado = value;
    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *       &lt;attribute name="CodAgrup" use="required" type="{www.sat.gob.mx/esquemas/ContabilidadE/1_1/CatalogosParaEsqContE}c_CodAgrup" />
     *       &lt;attribute name="NumCta" use="required">
     *         &lt;simpleType>
     *           &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *             &lt;maxLength value="100"/>
     *             &lt;minLength value="1"/>
     *           &lt;/restriction>
     *         &lt;/simpleType>
     *       &lt;/attribute>
     *       &lt;attribute name="Desc" use="required">
     *         &lt;simpleType>
     *           &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *             &lt;minLength value="1"/>
     *             &lt;maxLength value="400"/>
     *           &lt;/restriction>
     *         &lt;/simpleType>
     *       &lt;/attribute>
     *       &lt;attribute name="SubCtaDe">
     *         &lt;simpleType>
     *           &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *             &lt;minLength value="1"/>
     *             &lt;maxLength value="100"/>
     *           &lt;/restriction>
     *         &lt;/simpleType>
     *       &lt;/attribute>
     *       &lt;attribute name="Nivel" use="required">
     *         &lt;simpleType>
     *           &lt;restriction base="{http://www.w3.org/2001/XMLSchema}int">
     *             &lt;minInclusive value="1"/>
     *           &lt;/restriction>
     *         &lt;/simpleType>
     *       &lt;/attribute>
     *       &lt;attribute name="Natur" use="required">
     *         &lt;simpleType>
     *           &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
     *             &lt;pattern value="[DA]"/>
     *           &lt;/restriction>
     *         &lt;/simpleType>
     *       &lt;/attribute>
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "")
    public static class Ctas {

        @XmlAttribute(name = "CodAgrup", required = true)
        protected String codAgrup;
        @XmlAttribute(name = "NumCta", required = true)
        protected String numCta;
        @XmlAttribute(name = "Desc", required = true)
        protected String desc;
        @XmlAttribute(name = "SubCtaDe")
        protected String subCtaDe;
        @XmlAttribute(name = "Nivel", required = true)
        protected int nivel;
        @XmlAttribute(name = "Natur", required = true)
        protected String natur;

        /**
         * Gets the value of the codAgrup property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getCodAgrup() {
            return codAgrup;
        }

        /**
         * Sets the value of the codAgrup property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setCodAgrup(String value) {
            this.codAgrup = value;
        }

        /**
         * Gets the value of the numCta property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getNumCta() {
            return numCta;
        }

        /**
         * Sets the value of the numCta property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setNumCta(String value) {
            this.numCta = value;
        }

        /**
         * Gets the value of the desc property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getDesc() {
            return desc;
        }

        /**
         * Sets the value of the desc property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setDesc(String value) {
            this.desc = value;
        }

        /**
         * Gets the value of the subCtaDe property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getSubCtaDe() {
            return subCtaDe;
        }

        /**
         * Sets the value of the subCtaDe property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setSubCtaDe(String value) {
            this.subCtaDe = value;
        }

        /**
         * Gets the value of the nivel property.
         * 
         */
        public int getNivel() {
            return nivel;
        }

        /**
         * Sets the value of the nivel property.
         * 
         */
        public void setNivel(int value) {
            this.nivel = value;
        }

        /**
         * Gets the value of the natur property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getNatur() {
            return natur;
        }

        /**
         * Sets the value of the natur property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setNatur(String value) {
            this.natur = value;
        }

    }

}
