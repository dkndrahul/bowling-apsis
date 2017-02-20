using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bowling.Entities
{
    /// <summary>
    /// Entity Class for blowing.
    /// </summary>
    public class BowlingEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Score { get; set; }
        public string ScoreDetails { get; set; }
    }
}