export default class Data {
  api(path, method = "GET", body = null, requiresAuth=false, token=null) {
    
    const options = {
      method,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      mode: "cors",
    };

    if (body != null) {
      options.body = JSON.stringify(body);
    }

    if(requiresAuth){
      options.headers['Authorization'] = `Bearer ${token}`;

    }

    return fetch(path, options);
  }

  //+++ GET

  async getCourses() {
    try {
      const response = await this.api("http://localhost:3350/api/v1/courses");
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject("error");
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getOneCourse(id) {
    try {
      const resp = await this.api(`http://localhost:3000/api/v1/course/${id}`);
      if (resp.status === 200) {
        return resp.json();
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getDetails(id) {
    try {
      const response = await this.api(
        `http://localhost:3350/api/v1/courseDetails/${id}`
      );
      if (response.status === 200) {
        return response.json();
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  //+++ PUT

  async updateCourseDetails(id, body) {
    try {
      const resp = await this.api(
        `http://localhost:3350/api/v1/courseDetails/${id}`,
        "PUT",
        body
      );
      if (resp.status === 200) {
        return resp.json();
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async updateCourse(id, body) {
    try {
      const resp = await this.api(
        `http://localhost:3350/api/v1/courses/${id}`,
        "PUT",
        body
      );
      if (resp.status === 200) {
        return resp.json();
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  //+++

  async newCourse(body) {
    try {
      const resp = await this.api(
        "http://localhost:3000/api/v1/newCourse",
        "POST",
        body
      );
      if (resp.status === 201) {
        return resp.json();
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  //+++ DELETE

  async deleteCourse(id) {
    try {
      const resp = await this.api(
        `http://localhost:3000/api/v1/delCourse/${id}`,
        "DELETE"
      );
      if (resp.status === 202) {
        return resp.json();
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  //+++ Sign In

  async authentificate(body) {
    try {
      const resp = await this.api(
        "http://localhost:3350/api/v1/users/login",
        "POST",
        body
      );

      if (resp.status == 200) {
        return resp.json();
      } else {
        return "Username or Password is invalid";
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  //+++ Sign Up

  async signUp(obj){
    

  }

}
