/**
 * It acts as a middleware for the routes and service layer.
 */
class RouteHelper {

  /**
   * Main performer of the class.
   * 
   * @param {object} req Request object
   * @param {object} res Response object
   * @param {string} service Service name to execute
   */
  async perform(req, res, service) {

    try {

      const Service = require('../service/' + service);
      const serviceParams = Object.assign({}, req.params, req.query);
      const serviceObj = new Service(serviceParams);

      const response = await serviceObj.perform();

      return res.status(200).json(response.serviceResponse);

    }
    catch (e) {
      console.log('error in route helper : ',e);
      return res.sendStatus(400).send(JSON.stringify(e));

    }

  }

}

module.exports = new RouteHelper();