using bowling.Entities;
using bowling.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace bowling.Controllers
{
    public class BowlingController : ApiController
    {
        BowlingModel bowlingModel;

        public BowlingController()
        {
            bowlingModel = new BowlingModel();
        }

        // GET api/bowling
        public async Task<IEnumerable<BowlingEntity>> Get()
        {
            return await bowlingModel.GetAll();
        }

        // GET api/bowling/5
        public async Task<BowlingEntity> Get(int id)
        {
            return await bowlingModel.Get(id);
        }

        // POST api/bowling
        public void Post([FromBody]BowlingEntity bowlingEntity)
        {
            bowlingModel.Save(bowlingEntity);
        }

        // PUT api/bowling/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/bowling/5
        public void Delete(int id)
        {
        }
    }
}
