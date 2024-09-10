import whoiser from "whoiser";

const isDomainAvailable = async (domainName) => {
  const domainWhois = await whoiser(domainName, { follow: 1 });
  const firstDomainWhois = whoiser.firstResult(domainWhois);
  const firstTextLine = (firstDomainWhois.text[0] || "").toLowerCase();
  let domainAvailability = "unknown";
  const domainStatusArr = firstDomainWhois["Domain Status"];
  
  if (
    firstTextLine.includes(`no match for "${domainName}"`) ||
    firstTextLine.includes("domain not found") ||
    (domainStatusArr &&
      domainStatusArr[0]?.toLowerCase().includes("no object found"))
  ) {
    domainAvailability = "available";
  } else if (firstTextLine.includes("is reserved")) {
    domainAvailability = "reserved";
  } else {
    domainAvailability = "unavailable";
  }
  
  const createdDate = firstDomainWhois["Created Date"];
  const updatedDate = firstDomainWhois["Updated Date"];
  const expiryDate = firstDomainWhois["Expiry Date"];
  const nameServers = firstDomainWhois["Name Server"];
  const registrarUrl = firstDomainWhois["Registrar URL"];
  
  return {
    domain: domainName,
    available: domainAvailability === "available",
    createdDate,
    updatedDate,
    expiryDate,
    nameServers,
    registrarUrl
  };
};

export default isDomainAvailable;