'use strict'

class Admin {
  async handle ({ request, auth, response }, next) {
    try {
	    const user = auth.user
	    if(user.admin != true){
	    	return response.route('/')
	    	console.log(user.admin)
	    } else {
	    	await next()	    }
    } catch (error) {
      	await next()
    }
  }
}

module.exports = Admin
