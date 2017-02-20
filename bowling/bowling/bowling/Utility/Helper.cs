using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;

namespace bowling.Utility
{
    public class Helper
    {
        public static string GetConnectionString()
        {
            return ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        }

        #region mapper function
        public static Guid MapGuid(IDataRecord reader, string columnName)
        {
            if (reader[columnName] == DBNull.Value)
                return default(Guid);
            return reader.GetGuid(reader.GetOrdinal(columnName));
        }
        public static string MapString(IDataRecord reader, string columnName)
        {
            if (reader[columnName] == DBNull.Value)
                return null;
            return reader[columnName].ToString();
        }
        public static int? MapInt(IDataRecord reader, string columnName)
        {
            if (reader[columnName] == DBNull.Value)
                return default(int);
            return (int)reader[columnName];
        }
        public static decimal? MapDecimal(IDataRecord reader, string columnName)
        {
            if (reader[columnName] == DBNull.Value)
                return default(decimal);
            return (decimal)reader.GetValue(reader.GetOrdinal(columnName));
        }
        public static float? MapFloat(IDataRecord reader, string columnName)
        {
            if (reader[columnName] == DBNull.Value)
                return default(float);
            return (float)Convert.ToDouble(reader.GetValue(reader.GetOrdinal(columnName)));
        }
        public static DateTime MapDateTime(IDataRecord reader, string columnName)
        {
            if (reader[columnName] == DBNull.Value)
                return default(DateTime);
            return reader.GetDateTime(reader.GetOrdinal(columnName));
        }
        public static bool MapBool(IDataRecord reader, string columnName)
        {
            if (reader[columnName] == DBNull.Value)
                return default(bool);
            return (bool)reader.GetValue(reader.GetOrdinal(columnName));
        }
        #endregion

    }
}