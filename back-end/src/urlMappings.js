/**
 * @swagger
 * /user:
 *   post:
 *     tags:
 *       - User
 *     description: Save user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Return saved user
 *         schema:
 *           $ref: '#/definitions/User'
 */