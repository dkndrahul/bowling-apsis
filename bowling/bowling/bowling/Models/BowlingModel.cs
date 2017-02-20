using bowling.Entities;
using bowling.Utility;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace bowling.Models
{
    public class BowlingModel
    {
        #region Fields

        private string connectionString;

        #endregion

        #region Constructors

        public BowlingModel()
        {
            this.connectionString = Helper.GetConnectionString();
        }

        /// <summary>
		/// Get all the record to the BusinessAreas table.
		/// </summary>
		public async Task<List<BowlingEntity>> GetAll()
        {
            var bowlingEntity = new List<BowlingEntity>();
            using (var con = new SqlConnection(this.connectionString))
            {
                con.Open();
                var cmd = new SqlCommand(" SELECT * FROM [Score]", con);
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        bowlingEntity.Add(MapDataReader(reader));
                    }
                }
            }

            return bowlingEntity;
        }


        /// <summary>
		/// Get a record to the BusinessAreas table.
		/// </summary>
		public async Task<BowlingEntity> Get(int id)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@Id", id)
            };


            using (var con = new SqlConnection(this.connectionString))
            {
                con.Open();
                var cmd = new SqlCommand("SELECT * FROM [Score] WHERE  [Id] = @Id", con);
                cmd.Parameters.AddRange(parameters);
                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return MapDataReader(reader);
                    }
                }
                return null;
            }

        }


        /// <summary>
		/// Saves a record to the BusinessAreas table.
		/// </summary>
		public void Save(BowlingEntity bowlingEntity)
        {
            if (bowlingEntity == null)
                throw new Exception(bowlingEntity + " not be null");

            SqlParameter[] parameters = new SqlParameter[]
            {
                new SqlParameter("@Name", bowlingEntity.Name),
                new SqlParameter("@Score", bowlingEntity.Score),
                new SqlParameter("@ScoreDetails", bowlingEntity.ScoreDetails),
                
            };
            using (var con = new SqlConnection(this.connectionString))
            {
                con.Open();

                var cmd = new SqlCommand(" insert into [Score] ( "
                + "[Name],[Score], [ScoreDetails])"
                + " values ( @Name, @Score, @ScoreDetails)"
                + "select scope_identity()", con);
                cmd.Parameters.AddRange(parameters);
                cmd.ExecuteNonQuery();
                con.Close();
            }

        }


        /// <summary>
		/// Creates a new instance of the BusinessAreas class and populates it with data from the specified SqlDataReader.
		/// </summary>
		private BowlingEntity MapDataReader(IDataRecord dataReader)
        {
            return new BowlingEntity
            {
                Id = Helper.MapInt(dataReader, "Id").Value,
                Name = Helper.MapString(dataReader, "Name"),
                Score = Helper.MapInt(dataReader, "Score").Value,
                ScoreDetails = Helper.MapString(dataReader, "ScoreDetails")
            };
        }

        #endregion
    }
}