import isDomainAvailable from "../utils/domain";

export default defineEventHandler(async (event) => {
  console.log("details");
  try {
    const query = getQuery(event);
    const name = query.name;
    if (!name) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
      });
    }
    const domainWhois = await isDomainAvailable(name);
    return domainWhois;
  } catch (error) {
    console.log(error);
  }
});
