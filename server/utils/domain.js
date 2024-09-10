import whoiser from "whoiser";

const isDomainAvailable = async (domainName) => {
  try {
    const domainWhois = await whoiser(domainName, { follow: 1 });
    const firstDomainWhois = whoiser.firstResult(domainWhois);
    const firstTextLine = (firstDomainWhois.text && firstDomainWhois.text[0] || "").toLowerCase();
    let domainAvailability = "unknown";
    const domainStatusArr = firstDomainWhois["Domain Status"] || [];
    
    if (
      firstTextLine.includes(`no match for "${domainName}"`) ||
      firstTextLine.includes("domain not found") ||
      (domainStatusArr.length > 0 &&
        domainStatusArr[0].toLowerCase().includes("no object found"))
    ) {
      domainAvailability = "available";
    } else if (firstTextLine.includes("is reserved")) {
      domainAvailability = "reserved";
    } else {
      domainAvailability = "unavailable";
    }
    
    return {
      domain: domainName,
      available: domainAvailability === "available",
      createdDate: firstDomainWhois["Created Date"] || null,
      updatedDate: firstDomainWhois["Updated Date"] || null,
      expiryDate: firstDomainWhois["Expiry Date"] || null,
      nameServers: Array.isArray(firstDomainWhois["Name Server"]) ? firstDomainWhois["Name Server"] : null,
      registrarUrl: firstDomainWhois["Registrar URL"] || null
    };
  } catch (error) {
    console.error("Error in isDomainAvailable:", error);
    return {
      domain: domainName,
      available: false,
      error: "An error occurred while checking domain availability"
    };
  }
};

export default isDomainAvailable;